export class QueriesUserDto {
  name?: string;
  order_by?: 'name' | 'created_at';
  order?: 'ASC' | 'DESC';
  per_page?: number;
  page?: number;
}
