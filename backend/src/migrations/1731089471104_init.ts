import type { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';
import bcrypt from 'bcryptjs';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('users', {
    id: 'id',
    email: { type: 'text', notNull: true },
    password: { type: 'text', notNull: true },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
  pgm.createIndex('users', 'email', { unique: true });

  const password = bcrypt.hashSync('admin', 10);
  pgm.sql(`INSERT INTO "users" ("email", "password") VALUES ('admin@admin.com', '${password}');`);

  pgm.createTable('cards', {
    id: 'id',
    userId: {
      type: 'integer',
      notNull: true,
      references: '"users"',
      onDelete: 'CASCADE',
    },
    frontSide: { type: 'text' },
    backSide: { type: 'text' },
    canBeInFocusedDeck: { type: 'boolean' },
    rememberedCount: { type: 'integer', default: 0 },
    forgetCount: { type: 'integer', default: 0 },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
  pgm.createIndex('cards', 'userId');
}

export async function down(): Promise<void> {}