import React from "react";
import { UseFormRegister } from "react-hook-form";
import { FormSessionProps } from "../../models/PropsInterface";

interface CommentInputProps {
  register: UseFormRegister<FormSessionProps>;
}

const CommentInput: React.FC<CommentInputProps> = ({ register }) => (
  <div className="mb-3">
    <label htmlFor="comments" className="form-label">
      Commentaires
    </label>
    <textarea
      {...register("comments")}
      className="form-control"
      placeholder="Commentaires sur la session"
      id="comments"
    ></textarea>
  </div>
);

export default CommentInput;
