export function normalize<TEntity>(
  entities: TEntity[],
  idSelector: (entry: TEntity) => string,
): { [id: string]: TEntity } {
  return Object.values(entities).reduce(
    (prev, cur) => ({ ...prev, [idSelector(cur)]: cur }),
    {},
  );
}
