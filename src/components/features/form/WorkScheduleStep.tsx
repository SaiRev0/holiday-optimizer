import { Switch } from '../../ui/switch';
import { Label } from '../../ui/label';
import { StepHeader } from './components/StepHeader';
import { FormSection } from './components/FormSection';
import { StepTitleWithInfo } from './components/StepTitleWithInfo';
import { useSaturdayWorkingDay } from '@/hooks/useOptimizer';

export function WorkScheduleStep() {
  const colorScheme = 'blue';
  const { isSaturdayWorkingDay, setSaturdayWorkingDay } = useSaturdayWorkingDay();

  const titleWithInfo = (
    <StepTitleWithInfo
      title="Work Schedule"
      colorScheme={colorScheme}
      badge={{ label: 'Optional' }}
      tooltip={{
        title: 'Work Schedule Configuration',
        description:
          'Configure whether your company works 5 or 6 days a week. If you work Saturdays, the optimizer will consider them as working days and may schedule PTO accordingly.',
        ariaLabel: 'About work schedule configuration',
      }}
    />
  );

  return (
    <FormSection colorScheme={colorScheme} headingId="work-schedule-heading">
      <StepHeader
        number={2}
        title={titleWithInfo}
        description="Configure your work week schedule to help optimize your time off planning."
        colorScheme={colorScheme}
        id="work-schedule-heading"
      />

      <fieldset className="space-y-4 border-0 m-0 p-0" aria-labelledby="work-schedule-heading">
        <legend className="sr-only">Work schedule configuration</legend>

        <div className="p-5 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <Label
                htmlFor="saturday-working-toggle"
                className="text-sm font-semibold text-blue-900 dark:text-blue-100 cursor-pointer block leading-tight"
              >
                Saturday is a working day
              </Label>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-2 font-medium">
                {isSaturdayWorkingDay
                  ? '6-day work week (Monday to Saturday)'
                  : '5-day work week (Monday to Friday)'}
              </p>
            </div>
            <Switch
              id="saturday-working-toggle"
              checked={isSaturdayWorkingDay}
              onCheckedChange={setSaturdayWorkingDay}
              className="mt-0.5 shrink-0 data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-300 dark:data-[state=unchecked]:bg-gray-600"
              aria-describedby="saturday-working-description"
            />
          </div>
        </div>

        <div
          id="saturday-working-description"
          className="px-1 text-sm text-blue-600 dark:text-blue-400 space-y-2"
        >
          <div className="flex items-start gap-2">
            <span className="text-blue-500 dark:text-blue-400 mt-0.5">•</span>
            <p>
              <span className="font-medium">5-day work week:</span> Saturdays are weekends (no PTO
              needed)
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-500 dark:text-blue-400 mt-0.5">•</span>
            <p>
              <span className="font-medium">6-day work week:</span> Saturdays are working days (may
              need PTO)
            </p>
          </div>
        </div>
      </fieldset>
    </FormSection>
  );
}
