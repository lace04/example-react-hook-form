import React from 'react';
import { useForm } from 'react-hook-form';

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      //opcional
      nombre: '',
      correo: '',
      fechaNacimiento: '',
      password: '',
      confirmarPassword: '',
      pais: 'co',
      archivo: '',
      aceptaTerminos: false,
    },
  });

  const onSubmit = handleSubmit((data) => {
    //peticion a la api
    console.log(data);
    // reset({
    //   nombre: '',
    //   correo: '',
    //   fechaNacimiento: '',
    //   password: '',
    //   confirmarPassword: '',
    //   pais: 'ar',
    //   archivo: '',
    //   aceptaTerminos: false
    // })
    reset();
  });

  return (
    <div>
      <h1 className='text-3xl text-center font-bold text-gray-400 m-5'>
        React Hook Form
      </h1>
      <form
        className='flex flex-col justify-center w-[80%] sm:w-[70%] md:w-[40%] mx-auto my-5 p-5 bg-zinc-900 rounded-md shadow-md'
        onSubmit={onSubmit}
      >
        <label htmlFor='nombre' className='label'>
          Nombre
        </label>
        <input
          type='text'
          className='input'
          autoComplete='off'
          {...register('nombre', {
            required: {
              value: true,
              message: 'El nombre es requerido',
            },
            minLength: {
              value: 2,
              message: 'El nombre debe tener al menos 2 caracteres',
            },
            maxLength: {
              value: 25,
              message: 'El nombre debe tener menos de 25 caracteres',
            },
          })}
        />

        {errors.nombre && (
          <span className='text-red-500 text-xs mt-[-3px]'>
            {errors.nombre.message}
          </span>
        )}

        <label htmlFor='correo' className='label'>
          Correo
        </label>
        <input
          type='email'
          className='input'
          autoComplete='off'
          {...register('correo', {
            required: {
              value: true,
              message: 'El correo es requerido',
            },
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: 'El correo debe ser válido',
            },
          })}
        />
        {
          errors.correo && (
            <span className='text-red-500 text-xs mt-[-3px]'>
              {errors.correo.message}
            </span>
          ) // Si existe el error, se muestra el mensaje
        }

        <label htmlFor='password' className='label'>
          Password
        </label>
        <input
          type='password'
          className='input'
          {...register('password', {
            required: {
              value: true,
              message: 'El password es requerido',
            },
            minLength: {
              value: 6,
              message: 'El password debe tener al menos 6 caracteres',
            },
          })}
        />
        {errors.password && (
          <span className='text-red-500 text-xs mt-[-3px]'>
            {errors.password.message}
          </span>
        )}

        <label htmlFor='confirmarPassword' className='label'>
          Confirmar Password
        </label>
        <input
          type='password'
          className='input'
          {...register('confirmarPassword', {
            required: {
              value: true,
              message: 'El password es requerido',
            },
            minLength: {
              value: 6,
              message: 'El password debe tener al menos 6 caracteres',
            },
            validate: (value) => {
              return (
                value === watch('password') || 'Los passwords no coinciden'
              );
            },
          })}
        />
        {errors.confirmarPassword && (
          <span className='text-red-500 text-xs mt-[-3px]'>
            {errors.confirmarPassword.message}
          </span>
        )}

        <label htmlFor='fechaNacimiento' className='label'>
          Fecha de nacimiento
        </label>
        <input
          type='date'
          className='input'
          {...register('fechaNacimiento', {
            required: {
              value: true,
              message: 'La fecha de nacimiento es requerida',
            },
            validate: (value) => {
              const fechaNacimiento = new Date(value);
              const fechaActual = new Date();
              const edad =
                fechaActual.getFullYear() - fechaNacimiento.getFullYear();
              return edad >= 18 ? true : 'Debes ser mayor de edad';
            },
          })}
        />

        {errors.fechaNacimiento && (
          <span className='text-red-500 text-xs mt-[-3px]'>
            {errors.fechaNacimiento.message}
          </span>
        )}

        <label htmlFor='pais' className='label'>
          Pais
        </label>
        <select className='input' {...register('pais', { required: true })}>
          <option value='mx'>México</option>
          <option value='co'>Colombia</option>
          <option value='ar'>Argentina</option>
        </select>

        {/* combobox */}
        {
          watch('pais') === 'co' && (
            <>
              <label htmlFor='departamento' className='label'>
                Departamento
              </label>
              <input
                type='text'
                placeholder='Departamento'
                className='input text-xs'
                {...register('departamento', {
                  required: {
                    value: true,
                    message: 'El departamento es requerido',
                  },
                })}
              />
              {errors.departamento && (
                <span className='text-red-500 text-xs mt-[-3px]'>
                  {errors.departamento.message}
                </span>
              )}
            </>
          ) // Si el pais es Colombia, se muestra el combobox
        }

        <label htmlFor='foto' className='label'>
          Foto de perfil
        </label>
        <input
          type='file'
          className='input text-xs'
          onChange={(e) => {
            console.log(e.target.files[0].name);
            setValue('fotoUsuario', e.target.files[0].name);
          }}
        />

        <label htmlFor='terminos' className='label text-center mt-2'>
          Acepto terminos y condiciones
        </label>
        <input
          type='checkbox'
          className='input w-5 h-5 bg-blue-500 rounded-md'
          {...register('terminos', {
            required: {
              value: true,
              message: 'Debes aceptar los terminos y condiciones',
            },
          })}
        />
        {
          errors.terminos && (
            <span className='text-red-500 text-xs mt-[-3px]'>
              Debes aceptar los terminos y condiciones
            </span>
          ) // Si existe el error, se muestra el mensaje
        }

        <button
          type='submit'
          className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-4'
        >
          Enviar
        </button>

        <pre className='w-[400px]'>{JSON.stringify(watch(), null, 2)}</pre>
        <h3 className='font-extralight'>Hello {watch('nombre')}</h3>
      </form>
    </div>
  );
}

export default Form;
