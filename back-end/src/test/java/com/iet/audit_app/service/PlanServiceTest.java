package com.iet.audit_app.service;

import com.google.common.collect.ImmutableMap;
import com.iet.audit_app.model.dto.plan.PlanStatisticsDTO;
import com.iet.audit_app.model.dto.plan_item.PlanItemInfoDTO;
import com.iet.audit_app.model.entity.Plan;
import com.iet.audit_app.model.entity.PlanItem;
import com.iet.audit_app.model.entity.Task;
import com.iet.audit_app.model.enums.TaskStatus;
import com.iet.audit_app.repository.PlanRepository;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import static com.iet.audit_app.model.enums.TaskStatus.CANCELLED;
import static com.iet.audit_app.model.enums.TaskStatus.FINISHED;
import static com.iet.audit_app.model.enums.TaskStatus.IN_PROGRESS;
import static com.iet.audit_app.model.enums.TaskStatus.NOT_STARTED;
import static java.util.Optional.ofNullable;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

public class PlanServiceTest {

    private static final long PLAN_ID = 1L;

    private static final int[] PERCENTAGE_DONE = { 20, 70, 95 };

    private static final ImmutableMap<TaskStatus, Integer> STATUS_COUNT_MAP = ImmutableMap.<TaskStatus, Integer>builder()
            .put(NOT_STARTED, 3)
            .put(IN_PROGRESS, 5)
            .put(FINISHED, 8)
            .put(CANCELLED, 1)
            .build();

    @Mock
    private PlanItemService planItemService;

    @Mock
    private PlanRepository planRepository;

    @InjectMocks
    private PlanService planService;

    @BeforeTest
    void before() {
        MockitoAnnotations.openMocks(this);
        Plan plan = Mockito.mock(Plan.class);
        when(planRepository.findById(PLAN_ID))
                .thenReturn(ofNullable(plan));
    }

    @Test
    void getPlanStatistics() {
        initPlanInfo();
        List<PlanItemInfoDTO> planItemsInfo = planService.getPlanItemsInfo(PLAN_ID);

        assertThat(planItemsInfo.size()).isEqualTo(2);

        assertThat(planItemsInfo.get(0)
                .getTaskId()).isEqualTo(0L);
        assertThat(planItemsInfo.get(1)
                .getTaskId()).isEqualTo(2L);

        assertThat(planItemsInfo.get(0)
                .getPercentageDone()).isEqualTo(20);
        assertThat(planItemsInfo.get(1)
                .getPercentageDone()).isEqualTo(95);
    }

    @Test
    void getPlanItemsInfo() {
        initPlanStatistics();
        PlanStatisticsDTO statistics = planService.getPlanStatistics(PLAN_ID);
        assertThat(statistics).isNotNull();

        int total = STATUS_COUNT_MAP.values()
                .stream()
                .reduce(0, Integer::sum);
        assertThat(statistics.getTotal()).isEqualTo(total);

        assertThat(statistics.getNotStarted()).isEqualTo(STATUS_COUNT_MAP.get(NOT_STARTED));
        assertThat(statistics.getInProgress()).isEqualTo(STATUS_COUNT_MAP.get(IN_PROGRESS));
        assertThat(statistics.getFinished()).isEqualTo(STATUS_COUNT_MAP.get(FINISHED));
        assertThat(statistics.getCancelled()).isEqualTo(STATUS_COUNT_MAP.get(CANCELLED));

        assertThat(statistics.getPercentageDone()).isEqualTo(
                statistics.getFinished() * 100 / (total - statistics.getCancelled()));
    }

    private void initPlanInfo() {
        List<PlanItem> planItems = new ArrayList<>();
        for (int i = 0; i < PERCENTAGE_DONE.length; i++) {
            Task task = Mockito.mock(Task.class);
            when(task.getId())
                    .thenReturn((long) i);
            when(task.getPercentageDone())
                    .thenReturn(PERCENTAGE_DONE[i]);

            PlanItem planItem = Mockito.mock(PlanItem.class);
            when(planItem.getId())
                    .thenReturn((long) i);
            when(planItem.getPlanItemTitle())
                    .thenReturn(String.valueOf(i));
            when(planItem.getTask())
                    .thenReturn(task);
            when(planItem.isAdHoc()).thenReturn(i % 2 == 1);

            planItems.add(planItem);
        }
        when(planItemService.getPlanItemsByPlanId(PLAN_ID)).thenReturn(planItems);
    }

    private void initPlanStatistics() {
        List<PlanItem> planItems = new LinkedList<>();
        for (Map.Entry<TaskStatus, Integer> entry : STATUS_COUNT_MAP.entrySet()) {
            planItems.addAll(initPlanItemsStatus(entry.getKey(), entry.getValue()));
        }
        when(planItemService.getPlanItemsByPlanId(PLAN_ID)).thenReturn(planItems);
    }

    private List<PlanItem> initPlanItemsStatus(TaskStatus taskStatus, int count) {
        List<PlanItem> planItems = new ArrayList<>();
        PlanItem planItem = Mockito.mock(PlanItem.class);
        for (int i = 0; i < count; i++) {
            when(planItem.getStatus()).thenReturn(taskStatus);
            planItems.add(planItem);
        }
        return planItems;
    }
}