/**
 * This file is part of Adguard Browser Extension (https://github.com/AdguardTeam/AdguardBrowserExtension).
 * <p>
 * Adguard Browser Extension is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * <p>
 * Adguard Browser Extension is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 * <p>
 * You should have received a copy of the GNU Lesser General Public License
 * along with Adguard Browser Extension.  If not, see <http://www.gnu.org/licenses/>.
 */
package com.adguard.compiler;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringEscapeUtils;
import org.apache.commons.lang.StringUtils;

import java.io.File;
import java.io.IOException;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Helper method for customizing manifest files and extension local script rules
 */
public class SettingUtils {

    private final static String LICENSE_TEMPLATE = "/**\r\n " +
            " * This file is part of Adguard Browser Extension (https://github.com/AdguardTeam/AdguardBrowserExtension).\r\n " +
            " *\r\n " +
            " * Adguard Browser Extension is free software: you can redistribute it and/or modify\r\n " +
            " * it under the terms of the GNU Lesser General Public License as published by\r\n " +
            " * the Free Software Foundation, either version 3 of the License, or\r\n " +
            " * (at your option) any later version.\r\n " +
            " *\r\n " +
            " * Adguard Browser Extension is distributed in the hope that it will be useful,\r\n " +
            " * but WITHOUT ANY WARRANTY; without even the implied warranty of\r\n " +
            " * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\r\n " +
            " * GNU Lesser General Public License for more details.\r\n " +
            " *\r\n " +
            " * You should have received a copy of the GNU Lesser General Public License\r\n " +
            " * along with Adguard Browser Extension.  If not, see <http://www.gnu.org/licenses/>.\r\n " +
            " */";

    private final static String LOCAL_SCRIPT_RULES_FILE_TEMPLATE = LICENSE_TEMPLATE + "\r\n" +
            "/**\r\n" +
            " * By the rules of AMO and addons.opera.com we cannot use remote scripts\r\n" +
            " * (and our JS injection rules could be counted as remote scripts).\r\n" +
            " *\r\n" +
            " * So what we do:\r\n" +
            " * 1. We gather all current JS rules in the DEFAULT_SCRIPT_RULES object\r\n" +
            " * 2. We disable JS rules got from remote server\r\n" +
            " * 3. We allow only custom rules got from the User filter (which user creates manually)\r\n" +
            " *    or from this DEFAULT_SCRIPT_RULES object\r\n" +
            " */\r\n" +
            "adguard.rules.DEFAULT_SCRIPT_RULES = Object.create(null);\r\n%s";

    private final static Pattern LICENSE_TEMPLATE_PATTERN = Pattern.compile("(/\\*.+(?=This file is part of Adguard Browser Extension).+?\\*/)", Pattern.DOTALL);

    private static final Pattern CONTENT_SCRIPTS_DOCUMENT_START_PATTERN = Pattern.compile("\"js\":\\s+\\[([^\\]]+)\\].+\"run_at\":\\s+\"document_start\"", Pattern.MULTILINE | Pattern.DOTALL);
    private static final Pattern CONTENT_SCRIPTS_DOCUMENT_END_PATTERN = Pattern.compile("\"document_start\".+\"js\":\\s+\\[([^\\]]+)\\].+\"run_at\":\\s+\"document_end\"", Pattern.MULTILINE | Pattern.DOTALL);

    public static void writeLocalScriptRulesToFile(File dest, Set<String> scriptRules) throws IOException {
        String scriptRulesText = getScriptRulesText(scriptRules);
        String settings = String.format(LOCAL_SCRIPT_RULES_FILE_TEMPLATE, scriptRulesText);
        FileUtils.writeStringToFile(getLocalScriptRulesFile(dest), settings, "utf-8");
    }

    public static void updateManifestFile(File dest, Browser browser, String version, String extensionId, String updateUrl, String extensionNamePostfix) throws IOException {

        switch (browser) {
            case CHROMIUM:
            case EDGE:
                File manifestFile = new File(dest, "manifest.json");
                String content = FileUtils.readFileToString(manifestFile, "utf-8").trim();
                if (updateUrl != null) {
                    content = StringUtils.removeEnd(content, "}").trim();
                    content = content + ",\r\n\r\n";
                    content = content + "\t\"update_url\": \"" + updateUrl + "\"\r\n}";
                }
                content = StringUtils.replace(content, "${version}", version);
                FileUtils.writeStringToFile(manifestFile, content, "utf-8");
                break;
            case SAFARI:
                File infoPlistFile = new File(dest, "Info.plist");
                String contentInfoPlist = FileUtils.readFileToString(infoPlistFile, "utf-8");
                contentInfoPlist = StringUtils.replace(contentInfoPlist, "${extensionId}", extensionId);
                contentInfoPlist = StringUtils.replace(contentInfoPlist, "${version}", version);
                contentInfoPlist = StringUtils.replace(contentInfoPlist, "${updateURL}", updateUrl != null ? updateUrl : "");
                String updateFromGallery = StringUtils.contains(extensionId, "beta") ? "false" : "true";
                contentInfoPlist = StringUtils.replace(contentInfoPlist, "${updateFromGallery}", updateFromGallery);
                contentInfoPlist = StringUtils.replace(contentInfoPlist, "${extensionNamePostfix}", extensionNamePostfix);
                FileUtils.writeStringToFile(infoPlistFile, contentInfoPlist, "utf-8");
                break;
            case FIREFOX:
            case FIREFOX_LEGACY:
                File installRdf = new File(dest, "install.rdf");
                String contentRdf = FileUtils.readFileToString(installRdf, "utf-8").trim();
                //write update url link
                if (updateUrl == null) {
                    updateUrl = "";
                } else {
                    updateUrl = "<em:updateURL>" + updateUrl + "</em:updateURL>";
                }
                contentRdf = StringUtils.replace(contentRdf, "${updateUrl}", updateUrl);
                contentRdf = StringUtils.replace(contentRdf, "${version}", version);
                contentRdf = StringUtils.replace(contentRdf, "${extensionId}", extensionId);
                FileUtils.writeStringToFile(installRdf, contentRdf, "utf-8");
                //write version
                File packageJson = new File(dest, "package.json");
                String contentPackageJson = FileUtils.readFileToString(packageJson, "utf-8");
                contentPackageJson = StringUtils.replace(contentPackageJson, "${version}", version);
                contentPackageJson = StringUtils.replace(contentPackageJson, "${extensionId}", extensionId);
                contentPackageJson = StringUtils.replace(contentPackageJson, "${extensionNamePostfix}", extensionNamePostfix);
                FileUtils.writeStringToFile(packageJson, contentPackageJson, "utf-8");
                break;
        }
    }

    /**
     * By the rules of AMO and addons.opera.com we cannot use remote scripts,
     * but for beta and dev Firefox version we gonna support it.
     * <p>
     * Look DEFAULT_SCRIPT_RULES and https://github.com/AdguardTeam/AdguardBrowserExtension/issues/388.
     * <p>
     * In this temp solution we simply edit preload js code to allow all rules in FF
     *
     * @param dest   source path
     * @param branch branch name (release/beta/dev)
     */
    public static void updatePreloadRemoteScriptRules(File dest, String branch) throws Exception {
        if ("beta".equals(branch)
                || "dev".equals(branch)
                || "legacy".equals(branch)
                || "dev-legacy".equals(branch)) {

            String replaceClauseTemplate = "if (!isFirefox && !isOpera) {";

            File file = new File(dest, "lib/content-script/preload.js");
            String content = FileUtils.readFileToString(file, "utf-8").trim();

            if (StringUtils.indexOf(content, replaceClauseTemplate) < 0) {
                throw new Exception("Invalid code working with FF remote rules");
            }

            content = StringUtils.replaceOnce(content, replaceClauseTemplate, "if (!isOpera) {");
            if (StringUtils.indexOf(content, replaceClauseTemplate) > 0) {
                throw new Exception("Invalid code working with FF remote rules");
            }

            FileUtils.writeStringToFile(file, content, "utf-8");
        }
    }

    public static String getScriptRulesText(Set<String> scriptRules) {
        StringBuilder sb = new StringBuilder();
        if (scriptRules != null) {
            for (String scriptRule : scriptRules) {
                String ruleText = StringEscapeUtils.escapeJavaScript(scriptRule);
                sb.append("adguard.rules.DEFAULT_SCRIPT_RULES[\"").append(ruleText).append("\"] = true;\r\n");
            }
        }
        return sb.toString();
    }

    /**
     * Copy specific api files, join all js files into one, remove unused files
     *
     * @param dest    Build folder
     * @param browser Browser
     * @throws IOException
     */
    public static void createApiBuild(File dest, Browser browser) throws IOException {

        // Concat content scripts
        File manifestFile = new File(dest, "manifest.json");
        String manifestContent = FileUtils.readFileToString(manifestFile);

        String contentScriptsStartFile = "adguard/adguard-content.js";
        List<File> contentScriptsStart = extractContentScriptsFromManifest(dest, manifestContent, CONTENT_SCRIPTS_DOCUMENT_START_PATTERN);
        concatFiles(new File(dest, contentScriptsStartFile), contentScriptsStart);

        String contentScriptsEndFile = "adguard/adguard-assistant.js";
        List<File> contentScriptsEnd = extractContentScriptsFromManifest(dest, manifestContent, CONTENT_SCRIPTS_DOCUMENT_END_PATTERN);
        concatFiles(new File(dest, contentScriptsEndFile), contentScriptsEnd);

        // Update manifest.json content
        Matcher matcher = CONTENT_SCRIPTS_DOCUMENT_START_PATTERN.matcher(manifestContent);
        if (!matcher.find()) {
            throw new IllegalStateException();
        }
        manifestContent = StringUtils.replace(manifestContent, matcher.group(1), "\"" + contentScriptsStartFile + "\"");

        matcher = CONTENT_SCRIPTS_DOCUMENT_END_PATTERN.matcher(manifestContent);
        if (!matcher.find()) {
            throw new IllegalStateException();
        }
        manifestContent = StringUtils.replace(manifestContent, matcher.group(1), "\"" + contentScriptsEndFile + "\"");

        // Copy assistant file
        File assistantDir = new File(dest, "adguard/assistant");
        List<String> lines = IOUtils.readLines(new StringReader(manifestContent));
        for (String line : lines) {
            if (line.contains("/assistant/")) {
                String fileName = StringUtils.substringBetween(line.trim(), "\"", "\"");
                String copyFileName = StringUtils.substringAfter(fileName, "/assistant/");
                File file = new File(dest, fileName);
                File copyFile = new File(assistantDir, copyFileName);
                FileUtils.copyFile(file, copyFile);
                manifestContent = StringUtils.replace(manifestContent, fileName, "adguard/assistant/" + copyFileName);
            }
        }

        FileUtils.writeStringToFile(manifestFile, manifestContent);

        // Concat background scripts
        File backgroundPageFile = new File(dest, "background.html");
        String backgroundScriptFile = "adguard/adguard-api.js";
        List<File> backgroundScripts = new ArrayList<File>();
        lines = FileUtils.readLines(backgroundPageFile);
        for (String line : lines) {
            if (line.contains("<script")) {
                backgroundScripts.add(new File(dest, StringUtils.substringBetween(line, "src=\"", "\"")));
            }
        }
        concatFiles(new File(dest, backgroundScriptFile), backgroundScripts);
        String backgroundPageContent = ("<!DOCTYPE html>\r\n" +
                "<html>\r\n" +
                "<head>\r\n") +
                "<script type=\"text/javascript\" src=\"" + backgroundScriptFile + "\"></script>\r\n" +
                "</head>\r\n" +
                "</html>";
        FileUtils.writeStringToFile(backgroundPageFile, backgroundPageContent);

        FileUtils.moveFileToDirectory(new File(dest, "filters/filters.json"), new File(dest, "adguard"), false);
        FileUtils.moveFileToDirectory(new File(dest, "filters/filters_i18n.json"), new File(dest, "adguard"), false);
        FileUtils.deleteDirectory(new File(dest, "filters"));
        FileUtils.deleteDirectory(new File(dest, "lib"));
    }

    private static File getLocalScriptRulesFile(File sourcePath) {
        return new File(sourcePath, "lib/filter/rules/local-script-rules.js");
    }

    private static void concatFiles(File resultFile, List<File> files) throws IOException {
        StringBuilder resultContent = new StringBuilder();
        resultContent.append(LICENSE_TEMPLATE).append("\r\n\r\n");
        resultContent.append("(function (window, undefined) {\r\n");
        for (File file : files) {
            String fileContent = FileUtils.readFileToString(file);
            Matcher matcher = LICENSE_TEMPLATE_PATTERN.matcher(fileContent);
            if (matcher.find()) {
                fileContent = matcher.replaceFirst("");
            }
            fileContent = fileContent.trim();
            resultContent.append("\r\n");
            resultContent.append(fileContent);
            resultContent.append("\r\n");
        }
        resultContent.append("\r\n})(window);");
        FileUtils.writeStringToFile(resultFile, resultContent.toString());
    }

    private static List<File> extractContentScriptsFromManifest(File dest, String manifestContent, Pattern pattern) throws IOException {
        Matcher matcher = pattern.matcher(manifestContent);
        if (!matcher.find()) {
            throw new IllegalStateException();
        }
        List<String> contentScriptsStart = IOUtils.readLines(new StringReader(matcher.group(1)));
        List<File> result = new ArrayList<File>();
        for (String script : contentScriptsStart) {
            script = script.trim();
            if (!script.contains(".js")) {
                continue;
            }
            result.add(new File(dest, StringUtils.substringBetween(script, "\"", "\"")));
        }
        return result;
    }

}
