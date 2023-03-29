export const updateIngredientByPk = async (
  id: number,
  name: string,
  standard_unit: string
) => {
  const QUERY = gql`
    mutation MyMutation($id: Int!, $standard_unit: String!, $name: String!) {
      update_ingredient_by_pk(
        pk_columns: { id: $id }
        _set: { name: $name, standard_unit: $standard_unit }
      ) {
        id
        name
        standard_unit
      }
    }
  `;

  const PARAMETERS = { id, name, standard_unit };
  // const objectType = QUERY.definitions[0].selectionSet.selections[0].name.value;
  const { mutate, onDone } = useMutation(QUERY, { variables: PARAMETERS });
  mutate();
  return { mutate, onDone };
};
