import React, { useEffect, useRef, useState } from 'react'
import './styles.css'
import { Task, Priority } from './types'
import { sampleTasks, computeROI, formatROI, stableSortTasks } from './utils'
import TaskList from './components/TaskList'
import EditDialog from './components/EditDialog'
import ViewDialog from './components/ViewDialog'
import ConfirmDialog from './components/ConfirmDialog'
import Snackbar from './components/Snackbar'
const STORAGE_KEY = 'taskglitch_tasks_v1'
export default function App(){ 
  const [tasks,setTasks]=useState<Task[]>([])
  const [selected,setSelected]=useState<Task|null>(null)
  const [editing,setEditing]=useState<Task|null>(null)
  const [confirmDelete,setConfirmDelete]=useState<Task|null>(null)
  const [lastDeleted,setLastDeleted]=useState<Task|null>(null)
  const [snackOpen,setSnackOpen]=useState(false)
  const initializedRef=useRef(false)
  useEffect(()=>{ if(initializedRef.current) return; initializedRef.current=true; const stored=localStorage.getItem(STORAGE_KEY); if(stored){ try{ setTasks(JSON.parse(stored)) }catch{ const s=sampleTasks(); setTasks(s); localStorage.setItem(STORAGE_KEY,JSON.stringify(s)) } } else { const s=sampleTasks(); setTasks(s); localStorage.setItem(STORAGE_KEY,JSON.stringify(s)) } },[])
  useEffect(()=>{ localStorage.setItem(STORAGE_KEY,JSON.stringify(tasks)) },[tasks])
  function handleAdd(){ const t:Task={ id:Date.now(), title:'New Task', revenue:0, timeTaken:0, notes:'', priority:Priority.Medium, status:'todo', createdAt:Date.now() }; setTasks(prev=>stableSortTasks([...prev,t])) }
  function handleSave(updated:Task){ setTasks(prev=>stableSortTasks(prev.map(p=>p.id===updated.id?updated:p))); setEditing(null) }
  function handleDeleteConfirm(task:Task){ setTasks(prev=>prev.filter(t=>t.id!==task.id)); setLastDeleted(task); setSnackOpen(true); setConfirmDelete(null) }
  function handleUndo(){ if(!lastDeleted) return; setTasks(prev=>stableSortTasks([...prev,lastDeleted])); setLastDeleted(null); setSnackOpen(false) }
  function handleSnackClose(){ setSnackOpen(false); setLastDeleted(null) }
  return (<div className='app'><header><h1>Task Glitch — Fixed</h1><div><button onClick={handleAdd}>Add Task</button></div></header><main><TaskList tasks={tasks} onView={t=>setSelected(t)} onEdit={t=>setEditing(t)} onDelete={t=>setConfirmDelete(t)} /></main>{editing && <EditDialog task={editing} onSave={handleSave} onClose={()=>setEditing(null)} />}{selected && <ViewDialog task={selected} onClose={()=>setSelected(null)} />}{confirmDelete && <ConfirmDialog task={confirmDelete} onConfirm={()=>handleDeleteConfirm(confirmDelete)} onCancel={()=>setConfirmDelete(null)} /> }<Snackbar open={snackOpen} message='Task deleted' actionLabel='Undo' onAction={handleUndo} onClose={handleSnackClose} /></div>) }
