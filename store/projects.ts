import { defineStore } from 'pinia'
import { ref } from 'vue'
import type {
  ActivateBrandingDTO, ActivateBrandingResponse, ActivateDRMDTO,
  ActivateDRMResponse, AddApiKeyDTO, AddApiKeyResponse,
  CreateProjectDTO, CreateProjectResponse, DeleteApiKeyDTO,
  DeleteApiKeyResponse, DeletedProjectDTO, DeletedProjectResponse,
  GenerateAPIKeyDTO, GenerateAPIKeyFtpDTO, GenerateAPIKeyFtpResponse,
  GenerateAPIKeyResponse, GenerateCodeDTO, GenerateCodeResponse,
  Project, ProjectChangeTitleDTO, ProjectChangeTitleResponse,
  ProjectSettings, ProjectSettingsQuery, ProjectTargetingUpdateDTO,
  ProjectTargetingUpdateResponse, RestreamingProtectionByDomainDTO, RestreamingProtectionByDomainResponse,
  RestreamingProtectionByIpDTO, RestreamingProtectionByIpResponse, RestreamingProtectionByTimeDTO,
  RestreamingProtectionByTimeResponse, RestreamingProtectionDisableDTO, RestreamingProtectionDisableResponse,
  UpdateIntegrationDTO, UpdateIntegrationResponse, UpdateProtectionDTO,
  UpdateProtectionResponse, UpdateSkinDTO, UpdateSkinResponse
} from '~/types/store/projects'
import {
  userProjectActivateBranding, userProjectActivateDRM, userProjectAddApiKey,
  userProjectChangeTitle, userProjectCreate, userProjectDeleteApiKey,
  userProjectDeleted, userProjectGenerateAPIKey, userProjectGenerateAPIKeyFtp,
  userProjectIntegrationUpdate, userProjectProtectionUpdate, userProjectRestreamingProtectionByDomain,
  userProjectRestreamingProtectionByIp, userProjectRestreamingProtectionByTime, userProjectRestreamingProtectionDisable,
  userProjectSkinUpdate, userProjectTargetingUpdate, usrProjectGenerateCode
} from '~/apollo/mutations/projects'
import { userProjectSettings } from '~/apollo/queries/projects'

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref(<Array<Project>>[])
  const currentProject = ref(<Project>{})
  const projectSettings = ref(<ProjectSettings>{})

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
    projects.value.push({ ...res.data.userProjectCreate.record })
    changeCurrentProject(res.data.userProjectCreate.record.id)
    return res.data
  }

  const deleteProject = async (dto: DeletedProjectDTO) => {
    const { mutate } = useMutation<DeletedProjectResponse>(userProjectDeleted)
    const res = await mutate(dto)
    if (!res || !res.data) {
      throw new Error('Ошибка')
    } else {
      const updatedProjects = projects.value.filter(project => project.id !== dto.input.id)
      projects.value = updatedProjects
      if (updatedProjects.length <= 0) {
        projects.value = []
      } else {
        changeCurrentProject(updatedProjects[0].id)
      }
    }
    return res.data
  }

  const getUserProjectSettings = async (projectId: number | string) => {
    const { data, error } = await useAsyncQuery<ProjectSettingsQuery>(userProjectSettings, {
      projectId
    })
    // @ts-ignore
    if (error.value?.cause?.graphQLErrors[0]?.extensions?.errorData?.errorCode === 403 || error.value?.cause?.networkError?.statusCode === 401) { return }
    projectSettings.value = JSON.parse(JSON.stringify({ ...data.value.userProjectSettings }))
    return data.value
  }

  const projectChangeTitle = async (dto: ProjectChangeTitleDTO) => {
    const { mutate } = useMutation<ProjectChangeTitleResponse>(userProjectChangeTitle)
    const res = await mutate(dto)
    if (!res || !res.data) {
      throw new Error('Ошибка')
    } else if (currentProject.value) {
      currentProject.value = { ...currentProject.value, title: res.data.userProjectChangeTitle.title }
      const index = projects.value.findIndex(project => project.id === currentProject.value?.id)
      if (index !== -1) {
        const updatedProject = { ...currentProject.value }
        const updatedProjects = [...projects.value]
        updatedProjects[index] = updatedProject
        projects.value = updatedProjects
      }
    }
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

  const generateAPIKey = async (dto: GenerateAPIKeyDTO) => {
    const { mutate } = useMutation<GenerateAPIKeyResponse>(userProjectGenerateAPIKey)
    const res = await mutate(dto)
    if (!res || !res.data) {
      throw new Error('Ошибка')
    }
    projectSettings.value = { ...projectSettings.value, integration: { ...projectSettings.value?.integration, apiKey: res.data.userProjectGenerateAPIKey.apiKey } }
    return res.data
  }

  const generateCode = async (dto: GenerateCodeDTO) => {
    const { mutate } = useMutation<GenerateCodeResponse>(usrProjectGenerateCode)
    const res = await mutate(dto)
    if (!res || !res.data) {
      throw new Error('Ошибка')
    }
    projectSettings.value = { ...projectSettings.value, integration: { ...projectSettings.value?.integration, code: res.data.usrProjectGenerateCode.code } }
    return res.data
  }

  const generateAPIKeyFtp = async (dto: GenerateAPIKeyFtpDTO) => {
    const { mutate } = useMutation<GenerateAPIKeyFtpResponse>(userProjectGenerateAPIKeyFtp)
    const res = await mutate(dto)
    if (!res || !res.data) {
      throw new Error('Ошибка')
    }
    projectSettings.value = { ...projectSettings.value, integration: { ...projectSettings.value?.integration, apiKeyFtp: res.data.userProjectGenerateAPIKeyFtp.apiKeyFtp } }
    return res.data
  }
  const addApiKey = async (dto: AddApiKeyDTO) => {
    const { mutate } = useMutation<AddApiKeyResponse>(userProjectAddApiKey)
    const res = await mutate(dto)
    if (!res || !res.data) {
      throw new Error('Ошибка')
    }
    projectSettings.value = { ...projectSettings.value, integration: { ...projectSettings.value?.integration, apiKeyList: [...res.data.userProjectAddApiKey.apiKeyList] } }
    return res.data
  }

  const deleteApiKey = async (dto: DeleteApiKeyDTO) => {
    const { mutate } = useMutation<DeleteApiKeyResponse>(userProjectDeleteApiKey)
    const res = await mutate(dto)
    if (!res || !res.data) {
      throw new Error('Ошибка')
    }
    const apiKeyId = projectSettings.value.integration.apiKeyList.findIndex(apiKey => apiKey.id === dto.input.id)
    if (apiKeyId !== -1) {
      const integrationCopy = { ...projectSettings.value.integration }
      const updatedApiKeys = [...integrationCopy.apiKeyList]
      updatedApiKeys.splice(apiKeyId, 1)
      integrationCopy.apiKeyList = updatedApiKeys
      projectSettings.value.integration = integrationCopy
    } else {
      throw new Error('Ошибка')
    }
    return res.data
  }

  const updateIntegration = async (dto: UpdateIntegrationDTO) => {
    const { mutate } = useMutation<UpdateIntegrationResponse>(userProjectIntegrationUpdate)
    const res = await mutate(dto)
    if (!res || !res.data) {
      throw new Error('Ошибка')
    }
    projectSettings.value.integration = res.data.userProjectIntegrationUpdate
    return res.data
  }

  const updateProtection = async (dto: UpdateProtectionDTO) => {
    const { mutate } = useMutation<UpdateProtectionResponse>(userProjectProtectionUpdate)
    const res = await mutate(dto)
    if (!res || !res.data) {
      throw new Error('Ошибка')
    }
    return res.data
  }

  const restreamingProtectionDisable = async (dto: RestreamingProtectionDisableDTO) => {
    const { mutate } = useMutation<RestreamingProtectionDisableResponse>(userProjectRestreamingProtectionDisable)
    const res = await mutate(dto)
    if (!res || !res.data) {
      throw new Error('Ошибка')
    }
    projectSettings.value = { ...projectSettings.value, protection: { ...projectSettings.value?.protection, userAgentAllow: res.data.userProjectRestreamingProtectionDisable.userAgentAllow } }
    projectSettings.value = { ...projectSettings.value, protection: { ...projectSettings.value?.protection, userAgentDeny: res.data.userProjectRestreamingProtectionDisable.userAgentDeny } }
    return res.data
  }

  const restreamingProtectionByDomain = async (dto: RestreamingProtectionByDomainDTO) => {
    const { mutate } = useMutation<RestreamingProtectionByDomainResponse>(userProjectRestreamingProtectionByDomain)
    const res = await mutate(dto)
    if (!res || !res.data) {
      throw new Error('Ошибка')
    }
    projectSettings.value = { ...projectSettings.value, protection: { ...projectSettings.value?.protection, userAgentAllow: res.data.userProjectRestreamingProtectionByDomain.userAgentAllow } }
    projectSettings.value = { ...projectSettings.value, protection: { ...projectSettings.value?.protection, userAgentDeny: res.data.userProjectRestreamingProtectionByDomain.userAgentDeny } }
    projectSettings.value = { ...projectSettings.value, protection: { ...projectSettings.value?.protection, deniedEmptyReferrer: res.data.userProjectRestreamingProtectionByDomain.deniedEmptyReferrer } }
    projectSettings.value = { ...projectSettings.value, protection: { ...projectSettings.value?.protection, domains: res.data.userProjectRestreamingProtectionByDomain.domains } }
    return res.data
  }

  const restreamingProtectionByIp = async (dto: RestreamingProtectionByIpDTO) => {
    const { mutate } = useMutation<RestreamingProtectionByIpResponse>(userProjectRestreamingProtectionByIp)
    const res = await mutate(dto)
    if (!res || !res.data) {
      throw new Error('Ошибка')
    }
    projectSettings.value = { ...projectSettings.value, protection: { ...projectSettings.value?.protection, userAgentAllow: res.data.userProjectRestreamingProtectionByIp.userAgentAllow } }
    projectSettings.value = { ...projectSettings.value, protection: { ...projectSettings.value?.protection, userAgentDeny: res.data.userProjectRestreamingProtectionByIp.userAgentDeny } }
    return res.data
  }

  const restreamingProtectionByTime = async (dto: RestreamingProtectionByTimeDTO) => {
    const { mutate } = useMutation<RestreamingProtectionByTimeResponse>(userProjectRestreamingProtectionByTime)
    const res = await mutate(dto)
    if (!res || !res.data) {
      throw new Error('Ошибка')
    }
    projectSettings.value = { ...projectSettings.value, protection: { ...projectSettings.value?.protection, userAgentAllow: res.data.userProjectRestreamingProtectionByTime.userAgentAllow } }
    projectSettings.value = { ...projectSettings.value, protection: { ...projectSettings.value?.protection, userAgentDeny: res.data.userProjectRestreamingProtectionByTime.userAgentDeny } }
    projectSettings.value = { ...projectSettings.value, protection: { ...projectSettings.value?.protection, timeValid: res.data.userProjectRestreamingProtectionByTime.timeValid } }
    return res.data
  }

  const projectTargetingUpdate = async (dto: ProjectTargetingUpdateDTO) => {
    const { mutate } = useMutation<ProjectTargetingUpdateResponse>(userProjectTargetingUpdate)
    const res = await mutate(dto)
    if (!res || !res.data) {
      throw new Error('Ошибка')
    }
    return res.data
  }

  const updateSkin = async (dto: UpdateSkinDTO) => {
    const { mutate } = useMutation<UpdateSkinResponse>(userProjectSkinUpdate)
    const res = await mutate(dto)
    if (!res || !res.data) {
      throw new Error('Ошибка')
    }
    projectSettings.value = { ...projectSettings.value, skin: { ...projectSettings.value.skin, skinType: res.data.userProjectSkinUpdate.skinType } }
    return res.data
  }

  return {
    projects,
    currentProject,
    projectSettings,
    setProject,
    changeCurrentProject,
    createProject,
    deleteProject,
    activateBranding,
    activateDRM,
    getUserProjectSettings,
    projectChangeTitle,
    generateAPIKey,
    generateCode,
    generateAPIKeyFtp,
    addApiKey,
    deleteApiKey,
    updateIntegration,
    updateProtection,
    restreamingProtectionDisable,
    restreamingProtectionByDomain,
    restreamingProtectionByIp,
    restreamingProtectionByTime,
    projectTargetingUpdate,
    updateSkin
  }
})
