// path: frontend/src/pages/ScheduleAppointmentPage.jsx

import { useAppointmentScheduler } from "../hooks/useAppointmentScheduler";
import { Button } from "@/components/ui/button";
import Step1_SelectType from "../components/scheduling/Step1_SelectType";
import Step2_SelectProfessional from "../components/scheduling/Step2_SelectProfessional";
import Step3_SelectDateTime from "../components/scheduling/Step3_SelectDateTime";
import Step4_ConfirmDetails from "../components/scheduling/Step4_ConfirmDetails";
import Step5_Confirmation from "../components/scheduling/Step5_Confirmation";

export default function ScheduleAppointmentPage() {
  const { step, loading, error, data, selections, handlers } =
    useAppointmentScheduler();

  return (
    <div className="bg-slate-900 text-white min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Agendar Nueva Cita
        </h1>

        {/* Aquí puedes añadir una barra de progreso que dependa de 'step' */}

        <div className="transition-all duration-500">
          {step === 1 && (
            <Step1_SelectType
              appointmentTypes={data.appointmentTypes}
              onSelectType={handlers.handleSelectType}
              loading={loading.initial}
              error={error}
            />
          )}
          {step === 2 && (
            <Step2_SelectProfessional
              professionals={data.professionals}
              onSelectProf={handlers.handleSelectProf}
            />
          )}
          {step === 3 && (
            <Step3_SelectDateTime
              selectedProf={selections.prof}
              selectedDate={selections.date}
              onSelectDate={handlers.handleSelectDate}
              selectedTime={selections.time}
              onSelectTime={handlers.handleSelectTime}
              availableTimes={data.availableTimes}
              isLoadingTimes={loading.times}
            />
          )}
          {step === 4 && (
            <Step4_ConfirmDetails
              selections={selections}
              notes={selections.notes}
              onNotesChange={handlers.handleNotesChange}
            />
          )}
          {step === 5 && (
            <Step5_Confirmation
              selections={selections}
              onStartNew={handlers.startNewAppointment}
            />
          )}
        </div>

        {/* Botones de Navegación */}
        {step > 1 && step < 5 && (
          <div className="mt-8 flex justify-between">
            <Button onClick={handlers.goToPrevStep} variant="secondary">
              Atrás
            </Button>
            {step === 3 && (
              <Button
                onClick={handlers.goToNextStep}
                disabled={!selections.time}
              >
                Siguiente
              </Button>
            )}
            {step === 4 && (
              <Button onClick={handlers.confirmAppointment}>
                Confirmar Cita
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
