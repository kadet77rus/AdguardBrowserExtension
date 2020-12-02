import { SimpleRegex, NetworkRule, CosmeticRuleMarker } from '@adguard/tsurlfilter';

import { ANTIBANNER_FILTERS_ID } from '../../../../common/constants';
import { reactTranslator } from '../../../reactCommon/reactTranslator';

/**
 * String utils
 * @type {{substringAfter, containsIgnoreCase, substringBefore, startWith}}
 */
export const StringUtils = {
    startWith(str, prefix) {
        return !!(str && str.indexOf(prefix) === 0);
    },

    containsIgnoreCase(str, searchString) {
        return !!(str && searchString && str.toUpperCase()
            .indexOf(searchString.toUpperCase()) >= 0);
    },

    substringAfter(str, separator) {
        if (!str) {
            return str;
        }
        const index = str.indexOf(separator);
        return index < 0 ? '' : str.substring(index + separator.length);
    },

    substringBefore(str, separator) {
        if (!str || !separator) {
            return str;
        }
        const index = str.indexOf(separator);
        return index < 0 ? str : str.substring(0, index);
    },
};

/**
 * Url utils
 * @type {{getUrlWithoutScheme, isHierarchicUrl, getProtocol}}
 */
export const UrlUtils = {
    getProtocol(url) {
        let index = url.indexOf('//');
        if (index >= 0) {
            return url.substring(0, index);
        }
        // It's non hierarchical structured URL (e.g. stun: or turn:)
        index = url.indexOf(':');
        if (index >= 0) {
            return url.substring(0, index);
        }

        return '';
    },

    /**
     * Removes protocol from URL
     */
    getUrlWithoutScheme(url) {
        let index = url.indexOf('//');
        if (index >= 0) {
            url = url.substring(index + 2);
        } else {
            // It's non hierarchical structured URL (e.g. stun: or turn:)
            index = url.indexOf(':');
            if (index >= 0) {
                url = url.substring(index + 1);
            }
        }
        return StringUtils.startWith(url, 'www.') ? url.substring(4) : url;
    },

    /**
     * Checks the given URL whether is hierarchical or not
     * @param url
     * @returns {boolean}
     */
    isHierarchicUrl(url) {
        return url.indexOf('//') !== -1;
    },
};

export const splitToPatterns = (requestUrl, domain, whitelist) => {
    const PATTERNS_COUNT = 2;

    const hierarchicUrl = UrlUtils.isHierarchicUrl(requestUrl);
    const protocol = UrlUtils.getProtocol(requestUrl);

    let prefix;
    if (hierarchicUrl) {
        prefix = SimpleRegex.MASK_START_URL; // Covers default protocols: http, ws
    } else {
        prefix = `${protocol}:`; // Covers non-default protocols: stun, turn
    }

    if (whitelist) {
        prefix = NetworkRule.OPTIONS.MASK_ALLOWLIST + prefix;
    }

    const patterns = [];

    const relative = StringUtils.substringAfter(requestUrl, `${domain}/`);

    const path = StringUtils.substringBefore(relative, '?');
    if (path) {
        const parts = path.split('/');

        let pattern = `${domain}/`;
        for (let i = 0; i < Math.min(parts.length - 1, PATTERNS_COUNT); i += 1) {
            pattern += `${parts[i]}/`;
            patterns.push(prefix + pattern + SimpleRegex.MASK_ANY_CHARACTER);
        }
        const file = parts[parts.length - 1];
        if (file && patterns.length < PATTERNS_COUNT) {
            pattern += file;
            patterns.push(prefix + pattern);
        }
    }

    // add domain pattern to start
    patterns.unshift(prefix + domain + SimpleRegex.MASK_SEPARATOR);

    // push full url pattern
    const url = UrlUtils.getUrlWithoutScheme(requestUrl);
    if (`${domain}/` !== url) { // Don't duplicate: ||example.com/ and ||example.com^
        if (patterns.indexOf(prefix + url) < 0) {
            patterns.push(prefix + url);
        }
    }

    return patterns.reverse();
};

const MESSAGES = {
    OPTIONS_USERFILTER: reactTranslator.translate('options_userfilter'),
    OPTIONS_ALLOWLIST: reactTranslator.translate('options_allowlist'),
    IN_ALLOWLIST: reactTranslator.translate('filtering_log_in_allowlist'),
};

/**
 * Filter's name for filterId
 *
 * @param {Number} filterId
 * @param filtersMetadata
 * @returns {String}
 */
export const getFilterName = (filterId, filtersMetadata) => {
    if (filterId === ANTIBANNER_FILTERS_ID.USER_FILTER_ID) {
        return MESSAGES.OPTIONS_USERFILTER;
    }

    if (filterId === ANTIBANNER_FILTERS_ID.ALLOWLIST_FILTER_ID) {
        return MESSAGES.OPTIONS_ALLOWLIST;
    }

    const filterMetadata = filtersMetadata.filter((el) => el.filterId === filterId)[0];

    return filterMetadata ? filterMetadata.name : null;
};

export const createDocumentLevelBlockRule = (rule) => {
    const { ruleText } = rule;
    if (ruleText.indexOf(NetworkRule.OPTIONS_DELIMITER) > -1) {
        return `${ruleText},${NetworkRule.OPTIONS.BADFILTER}`;
    }
    return ruleText + NetworkRule.OPTIONS_DELIMITER + NetworkRule.OPTIONS.BADFILTER;
};

const generateExceptionRule = (ruleText, mask) => {
    const insert = (str, index, value) => str.slice(0, index) + value + str.slice(index);

    const maskIndex = ruleText.indexOf(mask);
    const maskLength = mask.length;
    const rulePart = ruleText.slice(maskIndex + maskLength);
    // insert exception mark after first char
    const exceptionMask = insert(mask, 1, '@');
    return exceptionMask + rulePart;
};

export const createExceptionCssRule = (rule, event) => {
    const { ruleText } = rule;
    const domainPart = event.frameDomain;
    if (ruleText.indexOf(CosmeticRuleMarker.Css) > -1) {
        return domainPart + generateExceptionRule(ruleText, CosmeticRuleMarker.Css);
    }
    if (ruleText.indexOf(CosmeticRuleMarker.ElementHidingExtCSS) > -1) {
        return domainPart + generateExceptionRule(
            ruleText,
            CosmeticRuleMarker.ElementHidingExtCSS,
        );
    }
    if (ruleText.indexOf(CosmeticRuleMarker.CssExtCSS) > -1) {
        return domainPart + generateExceptionRule(
            ruleText, CosmeticRuleMarker.CssExtCSS,
        );
    }
    if (ruleText.indexOf(CosmeticRuleMarker.ElementHiding) > -1) {
        return domainPart + generateExceptionRule(ruleText, CosmeticRuleMarker.ElementHiding);
    }

    return '';
};

export const createExceptionCookieRule = (rule, event) => {
    let domain = event.frameDomain;
    if (domain[0] === '.') {
        domain = domain.substring(1);
    }
    return NetworkRule.MASK_ALLOWLIST + SimpleRegex.MASK_START_URL + domain;
};

export const createExceptionScriptRule = (rule, event) => {
    const { ruleText } = rule;
    const domainPart = event.frameDomain;
    if (ruleText.indexOf(CosmeticRuleMarker.Js) > -1) {
        return domainPart + generateExceptionRule(ruleText, CosmeticRuleMarker.Js);
    }
    const MASK_SCRIPT_RULE_UBO = '##';
    if (ruleText.indexOf(MASK_SCRIPT_RULE_UBO) > -1) {
        return domainPart + generateExceptionRule(ruleText, MASK_SCRIPT_RULE_UBO);
    }

    return '';
};

/**
 * Request type map
 *
 * @param {String} requestType
 * @returns {String}
 */
export const getRequestType = (requestType) => {
    switch (requestType) {
        case 'DOCUMENT':
        case 'SUBDOCUMENT':
            return 'HTML';
        case 'STYLESHEET':
            return 'CSS';
        case 'SCRIPT':
            return 'JavaScript';
        case 'XMLHTTPREQUEST':
            return 'Ajax';
        case 'IMAGE':
            return 'Image';
        case 'OBJECT':
        case 'MEDIA':
            return 'Media';
        case 'FONT':
            return 'Font';
        case 'WEBSOCKET':
            return 'WebSocket';
        case 'WEBRTC':
            return 'WebRTC';
        case 'CSP':
            return 'CSP';
        case 'COOKIE':
            return 'Cookie';
        case 'OTHER':
            return 'Other';
        default:
            return '';
    }
};
