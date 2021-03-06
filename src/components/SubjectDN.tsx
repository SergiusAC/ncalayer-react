import React from "react"
import AppState from "../state"
import Client, { Response } from "@seithq/ncalayer"
import { checkInputs, ValidationType, handleError } from "../helper"
import Button from "./Fields/Button"
import Label from "./Fields/Label"
import Spacer from "./Fields/Spacer"
import Input from "./Fields/Input"

interface SubjectDNProps {
  client: Client
  state: AppState
  setState: React.Dispatch<React.SetStateAction<AppState>>
}

const SubjectDN: React.FC<SubjectDNProps> = ({ client, state, setState }) => {
  const handleSubjectDNClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const ok = checkInputs({
      path: state.path,
      alias: state.alias,
      password: state.password,
      keyAlias: state.keyAlias,
    })
    if (ok) {
      client.getSubjectDN(
        state.alias,
        state.path,
        state.keyAlias,
        state.password,
        (resp: Response) => {
          if (resp.isOk()) {
            setState({
              ...state,
              method: client.method,
              subjectDN: resp.getResult(),
            })

            return
          }

          handleError(
            resp,
            ValidationType.Password && ValidationType.PasswordAttemps
          )
        }
      )
    }
  }

  return (
    <div className="SubjectDN">
      <Label method="getSubjectDN">Данные субъекта</Label>
      <Input readOnly value={state.subjectDN} />
      <Spacer point="2" />
      <Button onClick={handleSubjectDNClick}>Узнать</Button>
    </div>
  )
}

export default SubjectDN
