//package com.ly.daythree.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.provisioning.InMemoryUserDetailsManager;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.CorsConfigurationSource;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//
//@Configuration
//public class SecurityConfig {
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http){
//         http.authorizeHttpRequests(auth->{
//            auth.requestMatchers("/").permitAll();
//            auth.anyRequest().authenticated();
//        }).formLogin(login->login.loginPage("/login").failureUrl("/login-error")).logout(logout->logout.clearAuthentication(true).logoutSuccessUrl("/").deleteCookies("JessionId"));
//    return http.build();}
//
//    @Bean
//    UserDetailsService userDetailsService(){
//        var user= User.builder().username("Naing").password("hello@").roles("USER").build();
//        var user1= User.builder().username("Lynn").password("hello@").roles("USER").build();
//        return new InMemoryUserDetailsManager(user,user1);
//    }
//
//    @Bean
//    CorsConfigurationSource corsConfigurationSource(){
//        CorsConfiguration source=new CorsConfiguration();
//        source.addAllowedHeader("*");
//        source.addAllowedOrigin("*");
//        source.addAllowedMethod("*");
//        source.setAllowCredentials(true);
//        UrlBasedCorsConfigurationSource url=new UrlBasedCorsConfigurationSource();
//        url.registerCorsConfiguration("/",source);
//        return url;
//    }
//}
