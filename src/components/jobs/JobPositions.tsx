import React from "react";
import { Form, Table } from "react-bootstrap";
import styles from "./JobDetail.module.scss";
import Image from "next/image";

export type Position = {
  jobTitleId: number;  
  _id:string;
  title: string;
  experience: string;
  salary: string;
};

export const JobPositions = ({ positions, onPositionSelect }: { positions: Position[], onPositionSelect: (positionId: string,checked:boolean) => void }) => {
  console.log(positions)
  const handlePositionSelect = (positionTitle: string,e:any) => {
    onPositionSelect(positionTitle,e.target.checked); 
  };
  
  return (
    <>
      <div className={styles.positions}>
        <Table>
          <tbody>
            {positions.map((position) => (
              <tr key={position._id}>
                <td className={styles.title}>
                  <Form.Check
                    type="checkbox"
                    id={`position-${position._id}`}
                    className={styles.positionCheckbox}
                    onChange={(e) => handlePositionSelect(position._id,e)} 
                  />
                  <div className="d-inline-block">
                    {position.title}
                    <h6>({position.experience} Years)</h6>
                  </div>
                </td>
                <td className={styles.amount}>
                  <div className={styles.amountContainer}>
                    <div>
                  <div className={styles.divider}></div>
                  <Image
                    src="/icons/salary.svg"
                    width={24}
                    height={24}
                    alt="salary"
                  />
                  </div>
                  {position.salary}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};
