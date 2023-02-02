interface HomeProps {
  poolCount: number;
  guessCount: number;
  userCount: number;
}

import Image from "next/image";
import appPreviewImg from "../assets/app-nlw-copa-preview.png";
import logoImg from "../assets/logo.svg";
import usersAvatarsExampleImg from "../assets/users-avatar-example.png";
import iconCheckImg from "../assets/icon-check.svg";
import { api } from "@/lib/axios";
import { FormEvent, useState } from "react";

export default function Home(props: HomeProps) {
  const [poolTitle, setPoolTitle] = useState('');

  async function createPool(event: FormEvent){
    event.preventDefault();

    try {
      const response = await api.post('/pools', {
        title: poolTitle
      })

      const { code } = response.data

      await navigator.clipboard.writeText(code)

      setPoolTitle('');
      alert('Bolão criado com sucesso! O código do seu bolão foi copiado para a área de transferência. Compartilhe com seus amigos!')

    } catch (error) {
      console.log(error);
      alert('Falha ao criar o bolão. Tente novamente.');
    }
  }

  return (
    <div className="max-w-[1124px] mx-auto h-screen grid grid-cols-2 gap-28 items-center">
      <main>
        <Image src={logoImg} alt="Logo da NLW Copa" quality={100} />

        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image
            src={usersAvatarsExampleImg}
            alt="Exemplo de avatares de usuários"
            quality={100}
          />
          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500">+{props.userCount}</span> usuários já criaram
            seu bolão
          </strong>
        </div>

        <form onSubmit={createPool} className="mt-10 flex gap-2">
          <input
            className="flex-1 px-6 py-4 rounded bg-gray-900 border border-gray-600 text-sm text-gray-100"
            type="text"
            placeholder="Qual o nome do seu bolão ?"
            required
            value={poolTitle}
            onChange={event => setPoolTitle(event.target.value)}
          />
          <button className="bg-yellow-500 px-6 py-4 text-sm text-gray-900 font-bold uppercase hover:bg-yellow-700" type="submit">
            Criar bolão
          </button>
        </form>

        <p className="text-gray-300 mt-4 text-sm leading-relaxed">
          Após criar o seu bolão, você receberá um código único que poderá ser
          usado para convidar seus amigos.
        </p>

        <div className="mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100">
          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="Ícone de check" quality={100} />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">{props.poolCount}</span>
              <span>Bolões criados.</span>
            </div>
          </div>
          <div className="w-px h-14 bg-gray-600"/>
          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="Ícone de check" quality={100} />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">{props.guessCount}</span>
              <span>Palpites enviados.</span>
            </div>
          </div>
        </div>
      </main>

      <Image
        src={appPreviewImg}
        alt="Dois celulares exibindo uma previa da aplicação movel do NLW Copa"
        quality={100}
      />
    </div>
  );
}

export async function getStaticProps() {
  const [poolCount, guessCount, userCount] = await Promise.all([
    api.get('/pools/count'),
    api.get('/guesses/count'),
    api.get('/users/count'),
  ]);

  return {
    props: {
      poolCount: poolCount.data,
      guessCount: guessCount.data,
      userCount: userCount.data,
    },
    revalidate: 60 * 40, // 40 minutes
  };
};