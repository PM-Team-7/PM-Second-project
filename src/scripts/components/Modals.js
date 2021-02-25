import '@styles/Swal.scss';

import Swal from 'sweetalert2';
// eslint-disable-next-line import/no-cycle
import Dashboard from '@components/Dashboard';

async function createCard() {
  const steps = [
    {
      title: 'Title',
      text: 'Enter card title',
      inputPlaceholder: 'Write something...',
      preConfirm: (value) => value || Swal.showValidationMessage('Title must be defined'),
    },
    {
      title: 'Description',
      text: 'Enter card description (optional)',
      inputPlaceholder: 'Write something...',
    },
  ];

  const data = await Swal.mixin({
    input: 'text',
    confirmButtonText: 'Next',
    showCancelButton: true,
    progressSteps: ['1', '2'],
  }).queue(steps);

  return {
    newTitle: data.value[0],
    newDescription: data.value[1],
  };
}

async function editCard({ title, description }) {
  const steps = [
    {
      title: 'Title',
      text: 'Edit card title',
      input: 'text',
      inputValue: title,
      inputPlaceholder: 'Write something...',
      preConfirm: (value) => value || Swal.showValidationMessage('Title must be defined'),
    },
    {
      title: 'Description',
      text: 'Edit card description',
      input: 'text',
      inputValue: description,
      inputPlaceholder: 'Write something...',
    },
    {
      title: 'Status',
      text: 'Edit card status',
      input: 'select',
      inputOptions: Dashboard.statuses.reduce((prev, next) => Object.create({
        ...prev,
        ...({
          [next.value]: next.title,
        }),
      }), {}),
      inputPlaceholder: 'Select status...',
      preConfirm: (value) => value || Swal.showValidationMessage('Status missing'),
    },
  ];

  const data = await Swal.mixin({
    confirmButtonText: 'Next',
    showCancelButton: true,
    progressSteps: ['1', '2', '3'],
  }).queue(steps);

  return {
    newTitle: data.value[0],
    newDescription: data.value[1],
    newStatus: data.value[2],
  };
}

export default {
  createCard,
  editCard,
};
