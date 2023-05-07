import { OrderDetails } from '@src/orderDetails/entity/orderDetails.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OrderItems {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	quantity: number;

	@Column({ default: new Date() })
	purchaseDate: Date;

	@ManyToOne(() => OrderDetails, orderDetails => orderDetails.orderItems, {
		cascade: ['insert'],
		onDelete: 'CASCADE',
	})
	orderDetails: OrderDetails;

	@Column()
	productId: number;

	@Column({ type: 'float' })
	price: number;

	@Column({ type: 'float' })
	total: number;
}
