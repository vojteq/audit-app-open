package com.iet.audit_app.utils;

import com.iet.audit_app.model.utils.DescriptionUtils;
import org.testng.annotations.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class DescriptionUtilsTest {

    @Test
    public void testIfTaskDescriptionIsUpdated() {
        //given
        String description = "Zadanie kontrolne z roku 2020";

        //when
        String newDesc = DescriptionUtils.updateTaskDescription(description);

        //then
        assertThat(newDesc).isEqualTo("Zadanie kontrolne z roku 2020, kontynuowane w 2021");
    }

    @Test
    public void testIfMovedTaskDescriptionIsUpdated() {
        //given
        String description = "Zadanie kontrolne z roku 2020, kontynuowane w 2021";

        //when
        String newDesc = DescriptionUtils.updateTaskDescription(description);

        //then
        assertThat(newDesc).isEqualTo("Zadanie kontrolne z roku 2020, kontynuowane w 2022");
    }


}
