import { OrderItems } from '@src/orderItems/entity/orderItems.entity';
import {
	Column,
	Entity,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { PaymentDetails } from '@paymentDetails/entity/paymentDetails.entity';

@Entity()
export class OrderDetails {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	total: number;

	@Column()
	userId: number;

	@Column({ default: new Date() })
	date: Date;

	@Column()
	identifier: string;

	@OneToMany(() => OrderItems, orderItems => orderItems.orderDetails, {
		onDelete: 'CASCADE',
		cascade: ['remove'],
	})
	orderItems: Array<OrderItems>;

	@OneToOne(
		() => PaymentDetails,
		paymentDetails => paymentDetails.orderDetails,
		{
			cascade: ['insert'],
			onDelete: 'CASCADE',
		}
	)
	paymentDetails: PaymentDetails;
}
