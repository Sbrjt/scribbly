import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('identities')
export class User {
	@PrimaryGeneratedColumn('uuid')
	id!: string

	@Column({ type: 'varchar', unique: true })
	email!: string

	@Column({ type: 'varchar' })
	password!: string
	// hashed password
}
