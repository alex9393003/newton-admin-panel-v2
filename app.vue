<template>
  <NuxtLayout name="default"></NuxtLayout>
</template>

<script setup>


onMounted(async () => {
  // const email = 'test@test.com'
  // const password = '123456'
  // const credentials = await createUser(email, password);
  // console.log('credentials', credentials);

  const email = 'test@test.com'
  const password = '123456'
  const credentials = await signInUser(email, password);
  console.log('credentials', credentials);

  const result = await signOutUser();
  console.log('result', result);


});

</script>