package com.iet.audit_app.model.utils;


import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class DescriptionUtils {

    private static final Pattern description = Pattern.compile("Zadanie ([a-zA-Z]+) z roku ([0-9]+)");
    private static final Pattern movedDescription = Pattern.compile("Zadanie ([a-zA-Z]+) z roku ([0-9]+), kontynuowane w ([0-9]+)");

    public static String updateTaskDescription(String oldTaskDescription) {
        Matcher descriptionMatcher = description.matcher(oldTaskDescription);
        Matcher movedDescriptionMatcher = movedDescription.matcher(oldTaskDescription);
        if(descriptionMatcher.matches()) {
            String stringYear = descriptionMatcher.group(2);
            int newYear = Integer.parseInt(stringYear) + 1;
            return oldTaskDescription + ", kontynuowane w " + newYear;
        }
        else if(movedDescriptionMatcher.matches()) {
            String stringYear = movedDescriptionMatcher.group(3);
            int newYear = Integer.parseInt(stringYear) + 1;
            return oldTaskDescription.replace(stringYear, String.valueOf(newYear));
        }
        throw new IllegalArgumentException("Wrong format of task description");
    }

}
