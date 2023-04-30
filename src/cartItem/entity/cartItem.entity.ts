import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CartItem {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	quantity: number;

	@Column({ default: new Date() })
	date: Date;

	@Column()
	productId: number;

	@Column()
	price: number;
}
