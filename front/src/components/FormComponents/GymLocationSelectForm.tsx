import { GymLocationSelectFormProps } from "../../models/PropsInterface";
import { Controller } from "react-hook-form";
import GymLocationSelect from "../GymLocationSelect";

const GymLocationSelectForm: React.FC<GymLocationSelectFormProps> = ({
  control,
  initGymId,
}) => {
  return (
    <>
      <label className="form-label mb-0" style={{ width: "100%" }}>
        Lieu
        {
          <Controller
            name="location"
            control={control}
            defaultValue={initGymId}
            render={({ field: { onChange, onBlur, ref } }) => {
              return (
                <GymLocationSelect
                  initGymId={initGymId}
                  onParentChange={(selectedOption: { value: any }) => {
                    // Transmet la valeur au Controller
                    onChange(
                      selectedOption ? Number(selectedOption.value) : null
                    );
                  }}
                  onBlur={onBlur} // Gère le blur
                  ref={ref} // Passe la référence
                  placeholder="Lieu de la grimpe"
                />
              );
            }}
            rules={{ required: true }}
          />
        }
      </label>
    </>
  );
};

export default GymLocationSelectForm;
