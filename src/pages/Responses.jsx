import { useEffect, useState } from 'react'
import { fetchDateResponses } from '../lib/firebase'
import { formatDate, formatTime } from '../lib/format'
import { FOODS } from '../steps/PickFood'

const foodLabel = (id) => {
  const f = FOODS.find((x) => x.id === id)
  return f ? `${f.emoji} ${f.label}` : id || '—'
}

const when = (r) => {
  const d = r.createdAt?.toDate?.() ?? (r.acceptedAt ? new Date(r.acceptedAt) : null)
  return d ? d.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }) : '—'
}

export default function Responses() {
  const [rows, setRows] = useState(null)
  const [error, setError] = useState(null)

  function load() {
    setError(null)
    setRows(null)
    fetchDateResponses().then(setRows, (err) => setError(err))
  }

  useEffect(() => {
    document.title = 'Responses · lovely-date'
    load()
  }, [])

  return (
    <div className="responses">
      <header className="responses-head">
        <h1 className="title">💌 Responses</h1>
        <button className="btn btn-ghost" onClick={load}>
          ↻ Refresh
        </button>
      </header>

      {error && (
        <p className="responses-msg is-error">
          Couldn't load responses: {error.code || error.message}
          {error.code === 'permission-denied' && ' — allow read on dateResponses in your Firestore rules.'}
        </p>
      )}
      {!error && !rows && <p className="responses-msg">Loading…</p>}
      {rows?.length === 0 && <p className="responses-msg">No responses yet.</p>}

      {rows?.length > 0 && (
        <>
          <p className="responses-msg">{rows.length} response{rows.length === 1 ? '' : 's'}</p>
          <div className="responses-table-wrap">
            <table className="responses-table">
              <thead>
                <tr>
                  <th>Who</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Food</th>
                  <th>"No" tries</th>
                  <th>Answered</th>
                  <th>Device</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id}>
                    <td>
                      {r.recipient || '—'}
                      {r.code && <span className="responses-code">{r.code}</span>}
                    </td>
                    <td>{formatDate(r.date) || '—'}</td>
                    <td>{formatTime(r.time) || '—'}</td>
                    <td>{foodLabel(r.food)}</td>
                    <td>{r.noAttempts ?? 0}</td>
                    <td>{when(r)}</td>
                    <td className="responses-ua" title={r.userAgent}>
                      {r.userAgent || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
