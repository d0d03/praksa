package com.dodo.punchin.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import com.dodo.punchin.services.CustomUserDetailsServices;
import com.dodo.punchin.services.JwtUtil;

@EnableWebSecurity
@Configuration
public class SpringSecurityConfiguration extends WebSecurityConfigurerAdapter {

	@Autowired
	private JwtUtil jwtUtil;
	@Autowired
	private CustomUserDetailsServices userDetailsService;

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:3000");
        config.addAllowedHeader("*");
        config.addAllowedMethod("OPTIONS");
        config.addAllowedMethod("GET");
        config.addAllowedMethod("POST");
        config.addAllowedMethod("PUT");
        config.addAllowedMethod("DELETE");
        config.addAllowedMethod("PATCH");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
	
	@Override
	public void configure(AuthenticationManagerBuilder auth) throws Exception
	{
		auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
	}
	
	@Override
	public void configure(HttpSecurity http) throws Exception {
		http.cors().and().csrf().disable()
		.addFilter(new JwtAutorizationFilter(authenticationManager(), userDetailsService, jwtUtil))
		.authorizeRequests().antMatchers(HttpMethod.DELETE,"/employees/{id}").hasRole("ADMIN")
		.antMatchers("/employees","/employees/{id}","/workday/**","/workdays/**","/notifications/**").hasRole("EMPLOYEE")
		.antMatchers("/authenticate", "/register","/confirm-account").permitAll()
		.and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		
	}
	
}
