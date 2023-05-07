import { OrderItems } from '@src/orderItems/entity/orderItems.entity';
import {
	Column,
	Entity,
	JoinColumn,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { PaymentDetails } from '@paymentDetails/entity/paymentDetails.entity';

@Entity()
export class OrderDetails {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'float' })
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

	@OneToOne(() => PaymentDetails, paymentDetails => paymentDetails, {
		cascade: ['insert'],
		onDelete: 'CASCADE',
	})
	@JoinColumn()
	paymentDetails: PaymentDetails;

	@Column()
	packageTracking: string;

	@Column()
	addressId: number;
}
