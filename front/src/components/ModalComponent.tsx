import React from "react";

interface ModalComponentProps {
  setCurrentSessionId?: React.Dispatch<React.SetStateAction<number | null>>;
  callApi?: (id: number) => Promise<unknown>;
  description: string;
  title: string;
  actionDescription: string;
  objectId?: number;
  buttonStyle?: { [key: string]: string };
  buttonClassName?: string;
  handleResponse?: () => void;
}

const ModalComponent: React.FC<ModalComponentProps> = (
  props: ModalComponentProps
) => {
  const [isCallingApi, setIsCallingApi] = React.useState(false);

  const handleAction = async () => {
    try {
      setIsCallingApi(true);
      if (props.callApi && props.objectId !== undefined) {
        await props.callApi(props.objectId);
      }
      props.handleResponse && props.handleResponse();
    } catch (error) {
      setIsCallingApi(false);
      console.error("Erreur lors de la requête :", error);
    }
  };

  return (
    <>
      <div className="overlay z-index-max"></div>
      <div className="modal fade show d-block" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content custom-modal-content">
            <div
              className="modal-header custom-modal-header "
              data-bs-theme="dark"
            >
              <h5 className="modal-title custom-modal-title">{props.title}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={() =>
                  props.setCurrentSessionId && props.setCurrentSessionId(null)
                }
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body custom-modal-body">
              <p>{props.description}</p>
            </div>
            <div className="modal-footer custom-modal-footer">
              <button
                type="button"
                className="btn custom-btn custom-btn-primary"
                onClick={() =>
                  props.setCurrentSessionId && props.setCurrentSessionId(null)
                }
                data-bs-dismiss="modal"
              >
                Fermer
              </button>
              <button
                type="button"
                className={`btn custom-btn ${isCallingApi ? "disabled" : ""} ${
                  props.buttonClassName
                }`}
                style={props.buttonStyle}
                onClick={() => handleAction()}
              >
                {props.actionDescription}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalComponent;
