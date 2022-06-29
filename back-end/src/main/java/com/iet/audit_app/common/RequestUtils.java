package com.iet.audit_app.common;

import javax.servlet.http.HttpServletRequest;
import java.time.Year;
import java.util.HashMap;
import java.util.Map;

public final class RequestUtils {

    public static Year extractAndRemoveYearFromParameters(Map<String, String[]> parameters) {
        return Year.parse(parameters.remove("year")[0]);
    }

    public static Map<String, String[]> getParameters(HttpServletRequest request) {
        return new HashMap<>(request.getParameterMap());
    }

    public static String getAuthorizationHeader(HttpServletRequest request) {
        return request.getHeader("Authorization");
    }
}
