import React from "react";
import { Form, Table } from "react-bootstrap";
import styles from "./JobDetail.module.scss";
import Image from "next/image";

export type Position = {
  positionId: number;  
  title: string;
  experience: string;
  salary: string;
};

export const JobPositions = ({ positions, onPositionSelect }: { positions: Position[], onPositionSelect: (title: string) => void }) => {

  const handlePositionSelect = (positionTitle: string) => {
    onPositionSelect(positionTitle); 
  };
  
  return (
    <>
      <div className={styles.positions}>
        <Table>
          <tbody>
            {positions.map((position) => (
              <tr key={position.positionId}>
                <td className={styles.title}>
                  <Form.Check
                    type="checkbox"
                    id={`position-${position.positionId}`}
                    className={styles.positionCheckbox}
                    onChange={() => handlePositionSelect(position.title)} 
                  />
                  <div className="d-inline-block">
                    {position.title}
                    <h6>({position.experience} Years)</h6>
                  </div>
                </td>
                <td>
                  <div className={styles.divider}></div>
                  <Image
                    src="/icons/salary.svg"
                    width={24}
                    height={24}
                    alt="salary"
                  />
                  {position.salary}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};
