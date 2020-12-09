/**
 * This file is part of Adguard Browser Extension (https://github.com/AdguardTeam/AdguardBrowserExtension).
 *
 * Adguard Browser Extension is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Adguard Browser Extension is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Adguard Browser Extension.  If not, see <http://www.gnu.org/licenses/>.
 */

import { runtimeImpl } from './common-script';

/**
 * Used to receive notifications from background page
 * @param events Events for listening
 * @param callback Event listener callback
 * @param onUnloadCallback Window unload callback
 */
export async function createEventListener(events, callback, onUnloadCallback) {
    function eventListener(...args) {
        callback(...args);
    }

    const response = await runtimeImpl.sendMessage({ type: 'createEventListener', events });
    let { listenerId } = response;

    runtimeImpl.onMessage.addListener(function (message) {
        if (message.type === 'notifyListeners') {
            eventListener.apply(this, message.args);
        }
    });

    const onUnload = function () {
        if (listenerId) {
            runtimeImpl.sendMessage({ type: 'removeListener', listenerId });
            listenerId = null;
            if (typeof onUnloadCallback === 'function') {
                onUnloadCallback();
            }
        }
    };

    window.addEventListener('beforeunload', onUnload);
    window.addEventListener('unload', onUnload);
}
