package com.iet.audit_app.common;

import org.passay.CharacterData;
import org.passay.CharacterRule;
import org.passay.EnglishCharacterData;

public final class PasswordGenerator {

    public static String generatePassword() {
        org.passay.PasswordGenerator generator = new org.passay.PasswordGenerator();

        CharacterData lowerCaseChars = EnglishCharacterData.LowerCase;
        CharacterRule lowerCaseRule = new CharacterRule(lowerCaseChars);
        lowerCaseRule.setNumberOfCharacters(3);

        CharacterData upperCaseChars = EnglishCharacterData.UpperCase;
        CharacterRule upperCaseRule = new CharacterRule(upperCaseChars);
        upperCaseRule.setNumberOfCharacters(3);

        CharacterData digitChars = EnglishCharacterData.Digit;
        CharacterRule digitRule = new CharacterRule(digitChars);
        digitRule.setNumberOfCharacters(3);

        CharacterData specialChars = new CharacterData() {
            @Override
            public String getErrorCode() {
                return "Error in password generator";
            }

            @Override
            public String getCharacters() {
                return "!@#$%^&*()_+-=/?";
            }
        };
        CharacterRule specialRule = new CharacterRule(specialChars);
        specialRule.setNumberOfCharacters(2);

        return generator.generatePassword(11, lowerCaseRule, upperCaseRule, digitRule, specialRule);
    }
}
