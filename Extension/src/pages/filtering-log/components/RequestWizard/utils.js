import { ANTIBANNER_FILTERS_ID } from '../../../../common/constants';
import { strings } from '../../../../common/strings';
import { MESSAGES } from './constants';

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
        let resultUrl = url;

        let index = resultUrl.indexOf('//');
        if (index >= 0) {
            resultUrl = resultUrl.substring(index + 2);
        } else {
            // It's non hierarchical structured URL (e.g. stun: or turn:)
            index = resultUrl.indexOf(':');
            if (index >= 0) {
                resultUrl = resultUrl.substring(index + 1);
            }
        }

        return strings.startWith(resultUrl, 'www.') ? resultUrl.substring(4) : resultUrl;
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
