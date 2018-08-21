package com.karolk.planner.config

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.autoconfigure.security.SecurityProperties
import org.springframework.boot.autoconfigure.security.oauth2.resource.ResourceServerProperties
import org.springframework.boot.autoconfigure.security.oauth2.resource.UserInfoTokenServices
import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.context.properties.NestedConfigurationProperty
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.annotation.Order
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.oauth2.client.OAuth2ClientContext
import org.springframework.security.oauth2.client.OAuth2RestTemplate
import org.springframework.security.oauth2.client.token.grant.code.AuthorizationCodeResourceDetails
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableOAuth2Client
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter
import org.springframework.security.web.csrf.CookieCsrfTokenRepository
import javax.servlet.Filter

@EnableOAuth2Client
@EnableAuthorizationServer
@Configuration
@Order(SecurityProperties.IGNORED_ORDER)
class SecurityConfig @Autowired constructor(private val oAuth2ClientContext: OAuth2ClientContext) : WebSecurityConfigurerAdapter() {

    override fun configure(http: HttpSecurity) {
        // @formatter:off
        http.antMatcher("/**")
                .authorizeRequests()
                    .antMatchers("/", "/api/login/facebook")
                        .permitAll()
                            .anyRequest()
                                .authenticated()
                .and()
                    .logout()
                        .logoutSuccessUrl("/")
                            .permitAll()
                .and()
                    .csrf()
                    .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                .and()
                    .addFilterBefore(ssoFilter(facebook(), "/api/login/facebook"), BasicAuthenticationFilter::class.java)
        // @formatter:on
    }

    @Bean
    @ConfigurationProperties("facebook")
    fun facebook() = ClientResources()

    private fun ssoFilter(clientResources: ClientResources, path: String): Filter {
        val oAuth2ClientAuthenticationFilter = FacebookOAuth2ClientAuthenticationProcessingFilter(oAuth2ClientContext, path)
        val oAuth2RestTemplate = OAuth2RestTemplate(clientResources.client, oAuth2ClientContext)
        oAuth2ClientAuthenticationFilter.restTemplate = oAuth2RestTemplate
        val tokenServices = UserInfoTokenServices(clientResources.resource.userInfoUri, clientResources.client.clientId)
        tokenServices.setRestTemplate(oAuth2RestTemplate)
        oAuth2ClientAuthenticationFilter.setTokenServices(tokenServices)
        return oAuth2ClientAuthenticationFilter
    }
}

class ClientResources {

    @NestedConfigurationProperty
    val client = AuthorizationCodeResourceDetails()

    @NestedConfigurationProperty
    val resource = ResourceServerProperties()
}