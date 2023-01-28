import * as Yup from 'yup';

export const messageFormSchema = Yup.object({
  title: Yup.string()
    .min(5, 'Must be 5 characters at minimum')
    .required('Title is Required'),
  text: Yup.string()
    .min(5, 'Must be 5 characters at minimum')
    .required('Required'),
  incentive: Yup.number()
    .positive('Must be more than 0'),
});
