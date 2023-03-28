import { OrderDetails } from '@src/orderDetails/entity/orderDetails.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { paymentStatus } from '@src/common/enums/paymentStatus.enum';
import { paymentType } from '@src/common/enums/paymentType.enum';

@Entity()
export class PaymentDetails {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	provider: string;

	@Column({ default: new Date() })
	date: Date;

	@Column({ default: [paymentStatus.WAITING], array: true, type: 'int' })
	status: Array<number>;

	@Column({ default: [paymentType.BOLETO] })
	type: Array<number>;

	@OneToOne(() => OrderDetails, orderDetails => orderDetails.paymentDetails, {
		cascade: ['insert'],
		onDelete: 'CASCADE',
	})
	orderDetails: OrderDetails;
}
