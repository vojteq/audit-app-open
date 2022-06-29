package com.iet.audit_app.model.utils;


import com.google.common.collect.ImmutableList;


public class TeamsForRoleUtils {

    public static final ImmutableList<String> KW_MANAGER_TEAMS = ImmutableList.<String>builder()
                                                                                   .add("KW")
                                                                                   .add("TD")
                                                                                   .add("WGT")
                                                                                   .add("BIO")
                                                                                   .add("KWC")
                                                                                   .add("TWD")
                                                                                   .add("TOK")
                                                                                   .add("TW")
                                                                                   .build();

    /*both managers have only one team under supervision, so there was no point for creating list for them
    * if you want to extend number of teams for them, create ImmutableList like for KW_MANAGER_TEAMS*/
    public static final String AW_MANAGER_TEAM = "AW";
    public static final String TD_MANAGER_TEAM = "TD";

}
