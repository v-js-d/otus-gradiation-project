import { defineStore } from 'pinia'
import { ref } from 'vue'
import type {
  ActivateBrandingDTO,
  ActivateBrandingResponse,
  ActivateDRMDTO,
  ActivateDRMResponse,
  CreateProjectDTO,
  CreateProjectResponse,
  Project
} from '~/types/store/projects'
import { userProjectActivateBranding, userProjectActivateDRM, userProjectCreate } from '~/apollo/mutations/projects'

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<Array<Project>>([])
  const currentProject = ref<Project>()
  const projectSettings = ref()

  const setProject = (items: Array<Project>) => {
    projects.value = items
    const projectLocalId: string | null = localStorage.getItem('currentProject')
    if (projectLocalId) {
      const cp = items.find(el => el.id === projectLocalId)
      if (cp) {
        currentProject.value = cp
      }
    } else {
      currentProject.value = projects.value[0]
    }
  }

  const changeCurrentProject = (projectId: string) => {
    const cp = projects.value?.find(el => el.id === projectId)
    if (cp) {
      currentProject.value = cp
      localStorage.setItem('currentProject', cp.id)
    }
  }

  const createProject = async (dto: CreateProjectDTO) => {
    const { mutate } = useMutation<CreateProjectResponse>(userProjectCreate)
    const res = await mutate(dto)
    if (!res || !res.data) {
      throw new Error('Ошибка')
    }
    // this.projects.concat([res.data.userProjectCreate.record])
    // this.projects.push(res.data.userProjectCreate.record)
    projects.value = [...projects.value, res.data.userProjectCreate.record]
    changeCurrentProject(res.data.userProjectCreate.record.id)
    return res.data
  }

  const activateBranding = async (dto: ActivateBrandingDTO) => {
    const { mutate } = useMutation<ActivateBrandingResponse>(userProjectActivateBranding)
    const res = await mutate(dto)
    if (!res || !res.data) {
      throw new Error('Ошибка')
    }
    return res.data
  }

  const activateDRM = async (dto: ActivateDRMDTO) => {
    const { mutate } = useMutation<ActivateDRMResponse>(userProjectActivateDRM)
    const res = await mutate(dto)
    if (!res || !res.data) {
      throw new Error('Ошибка')
    }
    return res.data
  }

  return {
    projects,
    currentProject,
    projectSettings,
    setProject,
    changeCurrentProject,
    createProject,
    activateBranding,
    activateDRM
  }
})
