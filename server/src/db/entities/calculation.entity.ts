import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({ name: 'calculations' })
export class CalculationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  equation: string;

  @Column('text')
  result: string;

  @CreateDateColumn()
  createdDate: Date;
}
