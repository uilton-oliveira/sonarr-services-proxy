import * as superagent from "superagent";
import {Response} from "express";

/**
 * Superagent wrapper for easily making AJAX requests. Provides a layer of
 * convenience by adding a base URL to each request. The base URL is derived
 * from the ```API_URL``` environment variable.
 */
class Request {
    private readonly baseUrl: string = process.env.API_URL || 'https://104.26.0.163' // 'http://services.sonarr.tv' // 'http://services-sonarr-tv.darksupremo.com'
    private readonly headerHost: string = process.env.HEADER_HOST || 'services.sonarr.tv';
    private readonly userAgent: string = process.env.USER_AGENT || 'okhttp/3.12.1';

    constructor() {}

    /**
     * DELETE relative `path` with optional callback `fn(res)`.
     *
     * @method del
     * @return {Request}
     * @public
     */
    public del(path: string): superagent.SuperAgentRequest {
        return (
            superagent
                .del(this.baseUrl + path)
                .set('Host', this.headerHost)
                .set('user-agent', this.userAgent)
        );
    }

    /**
     * GET relative `path` with optional `data` and callback `fn(res)`.
     *
     * @method get
     * @param {String} path
     * @return {Request}
     * @public
     */
    public get(path: string): superagent.SuperAgentRequest {
        return (
            superagent
                .get(this.baseUrl + path)
                .set('Host', this.headerHost)
                .set('user-agent', this.userAgent)
        );
    }

    public redirectGet(path: string, res: any) {
        this.get(path)
            .then((response: { body: any; }) => {
                res.send(response.body)
            })
            .catch((reason: any) => {
                res.send(reason)
            })
    }

    /**
     * PATCH relative `path` with optional `data` and callback `fn(res)`.
     *
     * @method patch
     * @param {String} path
     * @return {Request}
     * @public
     */
    public patch(path: string): superagent.SuperAgentRequest {
        return (
            superagent
                .patch(this.baseUrl + path)
                .set('Host', this.headerHost)
                .set('user-agent', this.userAgent)
        );
    }

    /**
     * POST relative `path` with optional `data` and callback `fn(res)`.
     *
     * @method post
     * @param {String} path
     * @return {Request}
     * @public
     */
    public post(path: string): superagent.SuperAgentRequest {
        return (
            superagent
                .post(this.baseUrl + path)
                .set('Host', this.headerHost)
                .set('user-agent', this.userAgent)
        );
    }

    /**
     * PUT relative `path` with optional `data` and callback `fn(res)`.
     *
     * @method put
     * @param {String} path
     * @return {Request}
     * @public
     */
    public put(path: string): superagent.SuperAgentRequest {
        return (
            superagent
                .put(this.baseUrl + path)
                .set('Host', this.headerHost)
                .set('user-agent', this.userAgent)
        );
    }
}

export const request = new Request();
