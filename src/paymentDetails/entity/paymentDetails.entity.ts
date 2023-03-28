import { OrderDetails } from '@src/orderDetails/entity/orderDetails.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { paymentStatus } from '@src/common/enums/statusPayment.enum';

@Entity()
export class PaymentDetails {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	provider: string;

	@Column()
	date: Date;

	@Column({ default: [paymentStatus.WAITING], array: true, type: 'int' })
	status: Array<number>;

	@OneToOne(() => OrderDetails, orderDetails => orderDetails.paymentDetails, {
		cascade: ['insert'],
		onDelete: 'CASCADE',
	})
	orderDetails: OrderDetails;
}
