// import { serverSupabaseClient } from '#supabase/server';

export default eventHandler((_) => {
  // const body = await readBody(event);
  // const user = await serverSupabaseUser(event);
  // const client = await serverSupabaseClient<Database>(event);
  // const { data } = await client.from(
  //   'kwami_blob_options').insert(body).select();
  return false;
});
