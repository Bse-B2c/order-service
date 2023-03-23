import { OrderDetails } from '@src/orderDetails/entity/orderDetails.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PaymentDetails {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	provider: string;

	@Column()
	date: Date;

	@Column()
	status: StatusPayment;

	@OneToOne(() => OrderDetails, orderDetails => orderDetails.paymentDetails, {
		cascade: ['insert'],
		onDelete: 'CASCADE',
	})
	orderDetails: OrderDetails;
}
