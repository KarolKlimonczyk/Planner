package com.karolk.planner.config

import org.springframework.security.core.Authentication
import org.springframework.security.oauth2.client.OAuth2ClientContext
import org.springframework.security.oauth2.client.filter.OAuth2ClientAuthenticationProcessingFilter
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class FacebookOAuth2ClientAuthenticationProcessingFilter(private val oauth2ClientContext: OAuth2ClientContext, defaultFilterProcessesUrl: String) : OAuth2ClientAuthenticationProcessingFilter(defaultFilterProcessesUrl) {

    override fun attemptAuthentication(request: HttpServletRequest, response: HttpServletResponse): Authentication {
        val token = request.getHeader("oauth_token")
        if (!token.isNullOrEmpty()) {
            this.oauth2ClientContext.accessToken = DefaultOAuth2AccessToken(token)
        }
        return super.attemptAuthentication(request, response)
    }
}