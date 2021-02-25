import '@styles/Swal.scss';

import Swal from 'sweetalert2';
// eslint-disable-next-line import/no-cycle
import Dashboard from '@components/Dashboard';

const MAX_TITLE_LENGTH = 100;
const MAX_DESC_LENGTH = 500;

const checkTitle = (value) => {
  if (!value) Swal.showValidationMessage('Title must be defined');
  else if (value.length > MAX_TITLE_LENGTH) Swal.showValidationMessage('Title is too long');
};

const checkDesc = (value) => {
  if (value.length > MAX_DESC_LENGTH) Swal.showValidationMessage('Description is too long');
};

async function createCard() {
  const steps = [
    {
      title: 'Title',
      text: 'Enter card title',
      inputPlaceholder: 'Write something...',
      preConfirm: (value) => checkTitle(value),
    },
    {
      title: 'Description',
      text: 'Enter card description (optional)',
      inputPlaceholder: 'Write something...',
      preConfirm: (value) => checkDesc(value),
    },
  ];

  const data = await Swal.mixin({
    input: 'text',
    confirmButtonText: 'Next',
    showCancelButton: true,
    progressSteps: ['1', '2'],
  }).queue(steps);

  if (data.dismiss) return null;

  return {
    newTitle: data.value[0],
    newDescription: data.value[1],
  };
}

async function editCard({ title, description, status }) {
  const steps = [
    {
      title: 'Title',
      text: 'Edit card title',
      input: 'text',
      inputValue: title,
      inputPlaceholder: 'Write something...',
      preConfirm: (value) => checkTitle(value),
    },
    {
      title: 'Description',
      text: 'Edit card description',
      input: 'text',
      inputValue: description,
      inputPlaceholder: 'Write something...',
      preConfirm: (value) => checkDesc(value),
    },
    {
      title: 'Status',
      text: 'Edit card status',
      input: 'select',
      inputOptions: Dashboard.statuses.reduce((prev, next) => Object.assign(prev, {
        [next.value]: next.title,
      }), {}),
      inputValue: status.value,
      inputPlaceholder: 'Select status...',
      preConfirm: (value) => value || Swal.showValidationMessage('Status missing'),
    },
  ];

  const data = await Swal.mixin({
    confirmButtonText: 'Next',
    showCancelButton: true,
    progressSteps: ['1', '2', '3'],
  }).queue(steps);

  if (data.dismiss) return null;

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
