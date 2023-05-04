import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CartItem {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	userId: number;

	@Column()
	total: number;
}
