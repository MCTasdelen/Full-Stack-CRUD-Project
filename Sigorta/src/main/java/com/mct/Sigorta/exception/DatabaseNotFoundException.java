package com.mct.Sigorta.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class DatabaseNotFoundException extends RuntimeException{
      private static final long serialVersionUID=1l;

    public DatabaseNotFoundException(String feedback) {
        super(feedback);
    }
}
