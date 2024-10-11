import { Form, Table } from "react-bootstrap";
import styles from "./JobDetail.module.scss";
import Image from "next/image";

export type Position = {
  positionId: number;
  title: string;
  experience: string;
  salary: string;
};

export const JobPositions = ({ positions }: { positions: Position[] }) => {
  return (
    <div className={styles.positions}>
      <Table>
        <tbody>
          {positions.map(
            (
              position: {
                positionId: number;
                title: string;
                experience: string;
                salary: string;
              },
              index: number
            ) => (
              <tr key={position.positionId}>
                <td className={styles.title}>
                <Form.Check // prettier-ignore
                    type={'checkbox'}
                    id={`position-${index}`}
                    className={styles.positionCheckbox}
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
            )
          )}
        </tbody>
      </Table>
    </div>
  );
};
