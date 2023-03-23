import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OrderItems {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	quantity: number;

	@Column()
	purchaseDate: Date;
}
