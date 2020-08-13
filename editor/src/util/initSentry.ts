import { getEnvironment } from "./getEnvironment";
import Vue from 'vue';
import * as Sentry from '@sentry/browser';
import {Vue as VueIntegration} from '@sentry/integrations';

export function initSentry(dsn: string): void {
    const environment = getEnvironment()
    if (environment !== 'local') {
        Sentry.init({
            dsn,
            integrations: [new VueIntegration({Vue, attachProps: true})],
            environment
        });
    }
}