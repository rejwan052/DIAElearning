package info.dia.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan({ "info.dia.service" })
public class ServiceConfig {
}
