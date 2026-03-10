"use client";

import { useState } from "react";
import { ActorFormData } from "@/types/actor";
import { useLanguage } from "@/context/LanguageContext";

interface ActorFormProps {
  onSubmit: (data: ActorFormData) => void;
  defaultValues?: ActorFormData;
  isSubmitting: boolean;
}

const inputStyle = {
  width: '200%',
  backgroundColor: 'rgb(31, 41, 55)',
  border: '1px solid rgb(75, 85, 99)',
  borderRadius: '8px',
  padding: '10px 16px',
  color: 'white',
  fontSize: '0.95rem',
  boxSizing: 'border-box' as const,
};

const labelStyle = {
  display: 'block',
  fontWeight: '500',
  marginBottom: '6px',
  color: 'rgb(209, 213, 219)',
  fontSize: '0.95rem',
};

export default function ActorForm({
  onSubmit,
  defaultValues,
  isSubmitting,
}: ActorFormProps) {
  const { t } = useLanguage();

  const [name, setName] = useState(defaultValues?.name ?? "");
  const [photo, setPhoto] = useState(defaultValues?.photo ?? "");
  const [nationality, setNationality] = useState(defaultValues?.nationality ?? "");
  const [birthDate, setBirthDate] = useState(
    defaultValues?.birthDate?.slice(0, 10) ?? ""
  );
  const [biography, setBiography] = useState(defaultValues?.biography ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, photo, nationality, birthDate, biography });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '520px' }}>

      <div>
        <label htmlFor="name" style={labelStyle}>{t.name}</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={inputStyle}
        />
      </div>

      <div>
        <label htmlFor="photo" style={labelStyle}>{t.photo}</label>
        <input
          id="photo"
          type="text"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          required
          style={inputStyle}
        />
      </div>

      <div>
        <label htmlFor="nationality" style={labelStyle}>{t.nationality}</label>
        <input
          id="nationality"
          type="text"
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
          required
          style={inputStyle}
        />
      </div>

      <div>
        <label htmlFor="birthDate" style={labelStyle}>{t.birthDate}</label>
        <input
          id="birthDate"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          required
          style={inputStyle}
        />
      </div>

      <div>
        <label htmlFor="biography" style={labelStyle}>{t.biography}</label>
        <textarea
          id="biography"
          value={biography}
          onChange={(e) => setBiography(e.target.value)}
          required
          rows={4}
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            backgroundColor: isSubmitting ? 'rgb(75, 85, 99)' : 'rgb(37, 99, 235)',
            color: 'white',
            fontWeight: 'bold',
            padding: '10px 28px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '0.95rem',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
          }}
        >
          {isSubmitting ? t.saving : t.save}
        </button>
      </div>

    </form>
  );
}