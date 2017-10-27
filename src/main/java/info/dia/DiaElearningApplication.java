package info.dia;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.context.request.RequestContextListener;

@SpringBootApplication
@EnableAsync
public class DiaElearningApplication extends SpringBootServletInitializer{

	
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(DiaElearningApplication.class);
	}

	public static void main(String[] args) {
		SpringApplication.run(DiaElearningApplication.class, args);
	}
	
	 @Bean
	 public RequestContextListener requestContextListener() {
	        return new RequestContextListener();
	 }
	 
}
